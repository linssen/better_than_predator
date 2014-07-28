import os
import tarfile
from fabric.api import (
    task, env, local, roles, execute, hide, put, puts, sudo, cd
)


env.project_name = 'betterthanpredator.com'
env.project_sub_dir = 'better_than_predator'
env.web_user = 'www-data'


#==============================================================================
# Tasks which set up deployment environments
#==============================================================================

@task
def production():
    """
    Use the live deployment environment.
    """
    server = env.project_name
    env.shell = '/bin/bash -c'
    env.roledefs = {
        'web': [server],
    }
    env.project_dir = '/var/www/%s/%s' % (env.project_name, env.project_sub_dir)

production()


#==============================================================================
# Actual tasks
#==============================================================================

@task
@roles('web')
def push(branch=None):
    """
    Push branch to the repository.
    """
    if branch is None:
        branch_string = local('git symbolic-ref HEAD', capture=True)
        branch = branch_string.replace('refs/heads/', '')

    local('git push ssh://{user}@{project_name}{project_dir} {branch}'.format(
        branch=branch, **env))
    with cd(env.project_dir):
        puts('Pushing {branch} up...'.format(branch=branch))
        sudo('git checkout -f %s' % branch, user=env.web_user)

@task
def deploy(verbosity='normal'):
    """
    Full server deploy.

    Updates the repository (server-side), synchronizes the database, collects
    static files and then restarts the web service.
    """
    if verbosity == 'noisy':
        hide_args = []
    else:
        hide_args = ['running', 'stdout']
    with hide(*hide_args):
        puts('Updating repository...')
        execute(push)
        puts('Grunting...')
        execute(grunt)

@task
@roles('web')
def grunt():
    """
    Grunt js task runner.
    """
    with cd(env.project_dir):
        sudo('grunt', user=env.web_user)

@task
@roles('web')
def upload(path, verbosity='normal'):
    """
    Uploads file or folder to server.
    """
    if not os.path.exists(path):
        exit('\n\'%s\' doesn\'t exist.')
    if verbosity == 'noisy':
        hide_args = []
    else:
        hide_args = ['running', 'stdout']
    with hide(*hide_args):
        puts('Zipping up & uploading file(s)..')
        archive = '%s.tar.gz' % os.path.basename(path)
        tar = tarfile.open(archive, 'w:gz')
        tar.add(path)
        tar.close()
        put(archive, '/tmp/%s' % archive)
        sudo('tar xzvf /tmp/%s -C %s' % (archive, env.project_dir), user=env.web_user)
        puts('Cleaning up...')
        local('rm %s' % archive)
        sudo('rm -f /tmp/%s' % archive)