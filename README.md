# Apache AGE website

## Introduction

- The `master` branch contains the source code of the latest version of the documentation.
- `vX.Y.Z` Branches contain the source code of the documentation of releases.
- The `asf-site` branch contains the static webpage code, as well as the build static version of the documenation (in the `docs` folder). The `docs` folder should not be manually updated.

## Build the documentation locally (first time)

- Install requirements (the latex and dvisvgm commands are required to display math)

```shell
sudo apt update
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt install texlive-latex-base texlive-latex-extra texlive-extra-utils python3.9 python3.9-venv software-properties-common
```

- Clone this repository
- Navigate to the root of the repository
- Create a python virtual environment

```shell
virtualenv -p python3.9 venv
```

- Activate the virtual environment

```shell
source venv/bin/activate
```

- Install the python requirements

```shell
pip install -r requirements.txt
```

- Build the documentation

  - From :warning: remote branches

    ```shell
    sphinx-multiversion docs build/html
    ```

    The documentation should now be in the `build/html` folder, with a subfolder per remote branch (version).

  - From the current folder

    ```shell
    sphinx-build docs build/html/current
    ```

    The documentation for the current local branch should now be in the `build/html/current` folder (no subfolders).

## Build documentation locally (after initial setup)

- Navigate to the root of the repository

- Activate the virtual environment if not yet active

```shell
source venv/bin/activate
```

- Build the documentation

  - From :warning: remote branches

    ```shell
    sphinx-multiversion docs build/html
    ```

    The documentation should now be in the `build/html` folder, with a subfolder per remote branch (version).

  - From the current folder

    ```shell
    sphinx-build docs build/html/current
    ```

    The updated documentation for the current local branch should now be in the `build/html/current` folder (no subfolders).
