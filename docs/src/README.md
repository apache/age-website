# Apache AGE documentation

This repository holds a proof of concept for the documentation for the [Apache AGE](https://age.apache.org/) project. It is a work in progress.

## Build the documentation (first time)

* install requirements

```shell
sudo apt install python3 virtualenv
```

* clone this repository
* navigate to the root of this repository
* create a python virtual environment

```shell
virtualenv -p python3 venv
```

* activate the virtual environment

```shell
source venv/bin/activate
```

* install the python requirements

```shell
pip install -r requirements.txt
```

* build the documentation
  * from :warning: remote branches

    ```shell
    sphinx-multiversion docs build/html
    ```

    The documentation should now be in the `build/html` folder, with a subfolder per remote branch (version).

  * from the current folder

    ```shell
    sphinx-build docs build/html
    ```

    The documentation for the current local branch should now be in the `build/html` folder (no subfolders).

## Build documentation (after initial setup)

* navigate to the root of this repository if not there yet

* activate the virtual environment if it is not yet active

```shell
source venv/bin/activate
```

* build the documentation
  * from :warning: remote branches

    ```shell
    sphinx-multiversion docs build/html
    ```

    The documentation should now be in the `build/html` folder, with a subfolder per remote branch (version).

  * from the current folder

    ```shell
    sphinx-build docs build/html
    ```

    The updated documentation for the current local branch should now be in the `build/html` folder (no subfolders).
