# Run the test suite

The configuration for running the tests is included in `Makefile`. The tests will be run against an existing installation:

```console
make -j$(nproc)
sudo make install
make installcheck
```

## Troubleshooting

### Invalid locale settings

```text
initdb: invalid locale settings; check LANG and LC_* environment variables
```

The locale settings can be set (to en_US.UTF-8 in the example) as follows ([source](https://www.thomas-krenn.com/en/wiki/Perl_warning_Setting_locale_failed_in_Debian)):

```console
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8
dpkg-reconfigure locales
```

The `dpkg-reconfigure locales` command will open a dialog under Debian for selecting the desired locale.

### Invalid permissions

```text
FATAL:  data directory "/clone_path/./regress/instance/data" has invalid permissions
DETAIL:  Permissions should be u=rwx (0700) or u=rwx,g=rx (0750).
```

When using Vagrant, directories created in synced folders don't respect umask. The Apache AGE source code needs to be cloned to an unsynced directory for running the tests.
