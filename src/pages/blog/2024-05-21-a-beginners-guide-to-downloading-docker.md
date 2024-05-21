---
templateKey: blog-post
title: A Beginner's Guide to Downloading Docker
date: 2024-05-21T01:56:54.293Z
description: A Beginner's Guide to Downloading Docker
featuredpost: true
featuredimage: /img/banner-landing.jpg
---
<!--StartFragment-->

Docker has become an essential technology for modern software development and deployment. It enables developers to bundle programs and dependencies into containers, resulting in a uniform environment across several computers. In this blog article, we will walk you through the process of downloading Docker step by step.



System Requirements:



1. WSL 2 Backend

* WSL version 1.1.3.0 or later.
* Windows 11 64-bit: Home or Pro version 21H2 or higher, or Enterprise or Education version 21H2 or higher.
* Windows 10 64-bit:

1. We recommend Home or Pro 22H2 (build 19045) or higher, or Enterprise or Education 22H2 (build 19045) or higher.
2. Minimum required is Home or Pro 21H2 (build 19044) or higher, or Enterprise or Education 21H2 (build 19044) or higher.

* Turn on the WSL 2 feature on Windows. For detailed instructions, refer to the [Microsoft documentation](https://learn.microsoft.com/en-us/windows/wsl/install).
* The following hardware prerequisites are required to successfully run WSL 2 on Windows 10 or Windows 11:

1. 64-bit processor with [Second Level Address Translation (SLAT)](https://en.wikipedia.org/wiki/Second_Level_Address_Translation)
2. 4GB system RAM
3. Enable hardware virtualization in BIOS. For more information, see [Virtualization](https://docs.docker.com/desktop/troubleshoot/topics/#virtualization).

Containers and images built using Docker Desktop are shared among all user accounts on the computers where it is installed. This is because all Windows accounts utilize the same virtual machine to create and operate containers. It is important to note that the Docker Desktop WSL 2 backend does not allow you to exchange containers or images between user accounts.

## Install Docker Desktop on Windows

1. Install from Command Line:

After downloading Docker Desktop Installer.exe, run the following command in a terminal to install Docker Desktop:



|     |
| --- |
|     |



If you’re using PowerShell you should run it as:



|     |
| --- |
|     |



If using the Windows Command Prompt:



|     |
| --- |
|     |





By default, Docker Desktop is installed at C:\Program Files\Docker\Docker.



The install command accepts the following flags:



* \--quiet: Suppresses information output when running the installer
* \--accept-license: Accepts the Docker Subscription Service Agreement now, rather than requiring it to be accepted when the application is first run
* \--no-windows-containers: Disables the Windows containers integration
* \--allowed-org=<org name>: Requires the user to sign in and be part of the specified Docker Hub organization when running the application
* \--backend=<backend name>: Selects the default backend to use for Docker Desktop, hyper-v, windows or wsl-2 (default)
* \--installation-dir=<path>: Changes the default installation location (C:\Program Files\Docker\Docker)
* \--admin-settings: Automatically creates an admin-settings.json file which is used by admins to control certain Docker Desktop settings on client machines within their organization. For more information, see Settings Management.

1. It must be used together with the --allowed-org=<org name> flag.
2. For example:

|     |
| --- |
|     |

* \--proxy-http-mode=<mode>: Sets the HTTP Proxy mode, system (default) or manual
* \--override-proxy-http=<URL>: Sets the URL of the HTTP proxy that must be used for outgoing HTTP requests, requires --proxy-http-mode to be manual
* \--override-proxy-https=<URL>: Sets the URL of the HTTP proxy that must be used for outgoing HTTPS requests, requires --proxy-http-mode to be manual
* \--override-proxy-exclude=<hosts/domains>: Bypasses proxy settings for the hosts and domains. Uses a comma-separated list.
* \--hyper-v-default-data-root=<path>: Specifies the default location for the Hyper-V VM disk.
* \--windows-containers-default-data-root=<path>: Specifies the default location for the Windows containers.
* \--wsl-default-data-root=<path>: Specifies the default location for the WSL distribution disk.
* \--always-run-service: Lets users switch to Windows containers without needing admin rights.



If your admin account is different to your user account, you must add the user to the docker-users group:



|     |
| --- |
|     |



Start Docker Desktop



Docker Desktop does not start automatically after installation. To start Docker Desktop:



1. Search for Docker, and select Docker Desktop in the search results.

![](https://lh7-us.googleusercontent.com/Y_GBdHLhHdtr-2hfMa6XCjZtT9wiQz1Xo6I3pAz5XND_fnGksxe-55I4XP6hDUsado2gKR2Z9i6SAbTP48DBaOTFny3rSo5eQ7RNGuGoqw9YGsKMtZtqBHpw0bZiGbsoFxUaJdpfWwojJ4kvm8KdmPk)



2. The Docker menu displays the Docker Subscription Service Agreement.\
   Here’s a summary of the key points:

* Docker Desktop is free for small businesses (fewer than 250 employees AND less than $10 million in annual revenue), personal use, education, and non-commercial open source projects.
* Otherwise, it requires a paid subscription for professional use.
* Paid subscriptions are also required for government entities.
* The Docker Pro, Team, and Business subscriptions include commercial use of Docker Desktop.

3. Select Accept to continue. Docker Desktop starts after you accept the terms.



Note that Docker Desktop won't run if you do not agree to the terms. You can choose to accept the terms at a later date by opening Docker Desktop.



Note that Docker Desktop won't run if you do not agree to the terms. You can choose to accept the terms at a later date by opening Docker Desktop.

**For more information, see [Docker Desktop Subscription Service Agreement](https://www.docker.com/legal/docker-subscription-service-agreement/). We recommend that you also read the [FAQs](https://www.docker.com/pricing/faq).**

<!--EndFragment-->