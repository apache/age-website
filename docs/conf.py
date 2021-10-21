# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'Apache AGE'
copyright = '2021, Apache AGE'
author = 'Apache AGE'

# The full version, including alpha/beta/rc tags
release = 'master'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinx_rtd_theme',
    'sphinx_multiversion',
    'myst_parser',
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

pygments_style = 'sphinx'


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'sphinx_rtd_theme'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

html_logo = 'images/logo.png'
html_favicon = 'images/favicon.ico'

html_context = {
    'display_github': True,
    'github_user': 'apache',
    'github_repo': 'incubator-age-website',
    'github_version': 'master',
    'conf_py_path': '/docs/',
    'navigation_depth': 2
}

# -- Multiversion options ----------------------------------------------------

# Don't include tags
smv_tag_whitelist = None
smv_branch_whitelist = r'^(?!gh-pages).*$'
smv_remote_whitelist = r'^.*$'
smv_released_pattern = r'^remotes/.*$'
smv_prefer_remote_refs = True


def setup(app):
    app.add_css_file('css/custom.css')  # may also be an URL

