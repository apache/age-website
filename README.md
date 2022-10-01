# Apache AGE website

## Introduction

* The `master` branch contains the source code of the latest version of the documentation.
* `vX.Y.Z` Branches contain the source code of the documentation of releases.
* The `asf-site` branch contains the static webpage code, as well as the build static version of the documenation (in the `docs` folder). The `docs` folder should not be manually updated.

## Build the documentation locally (One time setup)

This guide will be help in setting up the requirements to build documentation. 

### Step 1: Add the deadsnakes PPA to system's source list

```bash
sudo apt update
sudo add-apt-repository ppa:deadsnakes/ppa
```



### Step 2: Install requirements 

(the latex and dvisvgm commands are required to display math)

```shell
sudo apt install texlive-latex-base texlive-latex-extra texlive-extra-utils python3.9 python3.9-venv software-properties-common
```



### Step 3: Clone this repository

```bash
git clone https://github.com/apache/age-website.git
```



### Step 4: Navigate to the root of the repository

```bash
cd age-website
```



### Step 5: Create a python virtual environment

```shell
virtualenv -p python3.9 venv
```



### Step 6: Activate the virtual environment

```shell
source venv/bin/activate
```



### Step 7: Install the python requirements

```shell
pip install -r requirements.txt
```



### Step 8: Build the documentation

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



## Re-build documentation 

**Assuming initial setup is already done successfully**. Now it is time to make some changes to the documentation. 



### Step 1: Activate the virtual environment

```shell
source venv/bin/activate
```



### Step 2: Build the documentation

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



