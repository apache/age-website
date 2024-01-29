<br>

<p align="center">
     <img src="https://age.apache.org/age-manual/master/_static/logo.png" width="30%" height="30%">
</p>
<br>

<h3 align="center">
    <a href="https://age.apache.org/age-manual/master/_static/logo.png" target="_blank">
        <img src="https://age.apache.org/age-manual/master/_static/logo.png" height="25" height="30% alt="Apache AGE style="margin: 0 0 -3px 0">
    </a>
    <a href="https://age.apache.org/age-manual/master/_static/logo.png" target="_blank">
    </a>
     is a leading multi-model graph database </h3>
     
</h3>

<h3 align="center">Graph Processing & Analytics for Relational Databases</h3>

<br>


</br>






<h2><img height="30" src="https://age.apache.org/age-manual/master/_static/logo.png">&nbsp;&nbsp;Apache AGE website</h2>

## Introduction

* The `master` branch contains the source code of the latest version of the documentation.
* `vX.Y.Z` Branches contain the source code of the documentation of releases.
* The `asf-site` branch contains the static webpage code, as well as the build static version of the documenation (in the `docs` folder). The `docs` folder should not be manually updated.

## Build the documentation locally (first time)

* Install requirements (the latex and dvisvgm commands are required to display math)

- **MacOS**
```shell
brew install python3 virtualenv texlive
```

- **Ubuntu**
```shell
sudo apt install python3 virtualenv texlive-latex-base texlive-latex-extra texlive-extra-utils
```

* Clone this repository
* Navigate to the root of the repository
* Create a python virtual environment

```shell
virtualenv -p python3 venv
```

* Activate the virtual environment

```shell
source venv/bin/activate
```

* Install the python requirements

```shell
pip install -r requirements.txt
```

* Build the documentation
  * From :warning: remote branches

    ```shell
    sphinx-multiversion docs build/html
    ```

    The documentation should now be in the `build/html` folder, with a subfolder per remote branch (version).

  * From the current folder

    ```shell
    sphinx-build docs build/html/current
    ```

    The documentation for the current local branch should now be in the `build/html/current` folder (no subfolders).

## Build documentation locally (after initial setup)

* Navigate to the root of the repository

* Activate the virtual environment if not yet active

```shell
source venv/bin/activate
```

* Build the documentation
  * From :warning: remote branches

    ```shell
    sphinx-multiversion docs build/html
    ```

    The documentation should now be in the `build/html` folder, with a subfolder per remote branch (version).

  * From the current folder

    ```shell
    sphinx-build docs build/html/current
    ```

    The updated documentation for the current local branch should now be in the `build/html/current` folder (no subfolders).
