---
templateKey: docs-template
path: /contribution/process
title:
---

<div class="ReleaseProcess">

<div class="ReleaseProcessBox">

# Creating a release

This document includes the steps needed to be taken by the release manager to create a successful release candidate.

</div>

<div class="ReleaseProcessBox">

## Update the Postgres version extension

Update the version numbers in the AGE source code, so Postgres can identify which version number of AGE it is using. The extension number in Postgres and Apache releases are synchronized.

Files to update:

Step 1 - Rename CREATE EXTENSION script name:  
Rename age--Y.Y.Y.sql to age--X.X.X.sql

Step 2 - Update Makefile:  
Update line 62 in Makefile from: DATA = age--Y.Y.Y.sql to: DATA age--X.X.X.sql

Step 3 - Update age.control:  
Update line 18 in age.control from default_version = 'Y.Y.Y' to: default_version = 'X.X.X'

Step 4 Add Release Notes:  
Update RELEASE with X.X.X release notes

Step 5 update documentation:  
update line 46 in doc/conf.py:  
from:  
release = u'Y.Y.Y'  
to:  
release = u'X.X.X'

</div>

<div class="ReleaseProcessBox">

## Creating a release branch

The first step is to create a new release branch. The branch must follow the following naming pattern release/X.X.X where X.X.X is the release version number. In this example upstream is the apache/incubator-age github repository.  
git branch release/X.X.X upstream/master  
git checkout release/X.X.X  
git push upstream release/X.X.X:release/X.X.X

## Creating the release artifacts

Checkout the tag to a clean folder to avoid files that are ignored by git and remove the git folder. Next up is creating the tar.gz file  
git clone --depth 1 --branch X.X.X-rcX  
https://github.com/apache/incubator-age.git apache-age-X.X.Xincubating  
rm -rf apache-age-X.X.X-incubating/.git  
tar -czvf apache-age-X.X.X-incubating-src.tar.gz apache-ageX.X.X-incubating

</div>

<div class="ReleaseProcessBox">

## Sign the artifacts

This part assumes you already have created and registered keys to sign the artifacts, for more information on creating and adding your keys see here  
gpg --armor --default-key username@apache.org --output apacheage-X.X.X-incubating-src.tar.gz.asc --detach-sig apache-ageX.X.X-incubating-src.tar.gz  
sha512sum apache-age-X.X.X-incubating-src.tar.gz > apache-ageX.X.X-incubating-src.tar.gz.sha512\
\# Validate\
gpg --verify apache-age-X.X.X-incubating-src.tar.gz.asc  
sha512sum -c apache-age-X.X.X-incubating-src.tar.gz.sha512

</div>

<div class="ReleaseProcessBox">

## Staging the files

First step is to check out the SVN directory, and create a new directory  
svn co https://dist.apache.org/repos/dist/dev/incubator/age  
age_release  
cd age_release  
svn mkdir apache-age-x.x.x-incubating-rcx  
Now copy over the following files in this new directory  
apache-age-X.X.X-incubating-src.tar.gz.sha512  
apache-age-X.X.X-incubating-src.tar.gz.asc  
apache-age-X.X.X-incubating-src.tar.gz

Add and commit the files to svn  
svn add \*  
svn status  
svn commit -m 'Add release files for Apache age X.XX-rcX'  
Check if the files are uploaded here

</div>

<div class="ReleaseProcessBox">

## Send a mail to dev list to announce new release candidate

Mail Template  
Subject: [VOTE] Release Apache age (incubating) X.X.X-rcX  
TO: dev@age.apache.org

Hi All,

[ INCLUDE SOME TEXT ]

Build instructions can be found in the README included.

The tag to be voted on is X.X.X-rcX [REPLACE TAG] (commit[COMMIT HASH]):  
[ URL TO TAG COMMIT ]  
The release files, including signatures, digests, etc. can be found at:  
[ INCLUDE URL TO DIST RC FOLDER ]  
https://dist.apache.org/repos/dist/dev/incubator/age/apacheage-X.X.X-incubating-rcX/

The SHA512 Checksum for these artifacts is:  
[ INCLUDE CHECKSUM FROM SHA512 FILE ]

Release artifacts are signed with the following key:  
[ ADD URL TO YOUR KEY ON A PUBLIC KEYSERVER ]

For more information about the contents of this release, see:  
[ ADD URL TO RELEASE IN JIRA ]

Please vote on releasing this package as Apache AGE (incubating) X.XX!

The vote is open for 72 hours and passes if a majority of at least 3 +1 PMC votes are cast.

[ ] +1 Release this package as Apache age (incubating) X.XX  
[ ] +0 No opinion  
[ ] -1 Do not release this package because ...

Best Regards,  
[ YOUR NAME ]

</div>

<div class="ReleaseProcessBox">

## Send a result mail to the dev mailing list

Subject: [RESULT] [VOTE] Release Apache age (incubating) X.XXrcX  
TO: dev@age.apache.org

Hello Team,

The vote to release Apache age (incubating) X.X.X - RCX has passed/failed.

+1 (binding)  
+1 (non-binding)  
+0  
-1 (binding)  
-1 (non-binding)

Thank you for reviewing this release candidate.  
Cheers,  
[ YOUR NAME ]

</div>

<div class="ReleaseProcessBox">

## While in incubator

## Send a mail to the general incubator list

The mail to the IPMC is almost identical to our vote mail, a few extra details are added:

- Vote and Result mail thread  
  Subject: [VOTE] Release Apache age (incubating) X.XX-rcX  
  TO: general@incubator.apache.org  


Hi All,

[ INCLUDE SOME TEXT ]

Build instructions can be found in the README included.  
age community vote and result threads:

Vote:  
[ URL TO VOTE FROM https://lists.apache.org/list.html?dev@age.apache.org ]  
Result:  
[ URL TO VOTE RESULT FROM https://lists.apache.org/list.html?dev@age.apache.org ]  
The tag to be voted on is X.X.X-rcX [REPLACE TAG] (commit[COMMIT HASH]):  
[URL TO TAG COMMIT]

The release files, including signatures, digests, etc. can be found at:  
[ INCLUDE URL TO DIST RC FOLDER ]  
https://dist.apache.org/repos/dist/dev/incubator/age/apacheage-X.X.X-incubating-rcX/

The SHA512 Checksum for these artifacts is:  
[ INCLUDE CHECKSUM FROM SHA512 file ]

Release artifacts are signed with the following key:  
[ ADD URL TO YOUR KEY ON A PUBLIC KEYSERVER ]

For more information about the contents of this release, see:  
[ ADD URL TO RELEASE IN JIRA ]

Please vote on releasing this package as Apache age (incubating) X.X.X!

The vote is open for 72 hours and passes if a majority of at least 3 +1 PMC votes are cast.  
[ ] +1 Release this package as Apache age (incubating) X.XX  
[ ] +0 No opinion  
[ ] -1 Do not release this package because ...

Best Regards,  
[ YOUR NAME ]

</div>

<div class="ReleaseProcessBox">

## Creating a key

To generate and publish a key follow these steps, it is recommended to use your apache email as key alias.  
gpg --gen-key  
gpg -k [username]@apache.org

</div>

<div class="ReleaseProcessBox">

## get the ID for your key

gpg --send-keys --keyserver php.mit.edu [KEY ID]  
gpg --send-keys --keyserver keyserver.ubuntu.com [KEY ID]

Next step is to add your key to the key file in the Apache SVN repository.  
svn co https://dist.apache.org/repos/dist/dev/incubator/age  
age_release  
cd age_release  
gpg --list-sigs [KEY ID] >> KEYS  
gpg --armor --export [KEY ID] >> KEYS  
svn commit -m "added new public key to KEYS file"

</div>
