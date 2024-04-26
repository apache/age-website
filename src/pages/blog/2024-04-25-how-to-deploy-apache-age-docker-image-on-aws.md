---
templateKey: blog-post
title: How to Deploy Apache AGE Docker Image on AWS
date: 2024-04-25T08:37:04.997Z
description: >
  Apache AGE® is a PostgreSQL extension that provides graph database
  functionality. Apache AGE provides graph data processing and analytics
  capability to all relational databases. 

  This article will explore how to set up Amazon Web Services (AWS), deploy the Apache AGE Docker image, and query the PostgreSQL database running in the Docker container on Amazon Web Services (AWS).
featuredpost: true
featuredimage:
---
<!--StartFragment-->

Apache AGE® is a PostgreSQL extension that provides graph database functionality. Apache AGE provides graph data processing and analytics capability to all relational databases. 

This article will explore how to set up Amazon Web Services (AWS), deploy the Apache AGE Docker image, and query the PostgreSQL database running in the Docker container on Amazon Web Services (AWS).

Prerequisites

1. AWS Account: If you don’t already have one, sign up for an AWS account at [Amazon Web Services](https://aws.amazon.com/).
2. Docker: Install Docker on your local machine. You can download & install Docker from [here](https://www.docker.com/get-started).



Step 1: Set Up AWS Account

1. Log in to AWS: Access the AWS Management Console using your AWS account credentials.
2. Create an IAM User:
3. 1. Navigate to the IAM (Identity and Access Management) dashboard.
   2. Click on “Users” & then “Add user.”
   3. Provide a username and select “Programmatic access” to generate an access key and secret key for Docker authentication.

Step 2: Deploy Apache AGE Docker Image

1. Open a terminal on your local machine.
2. Pull the Apache AGE Docker image from Docker Hub: ![](https://lh7-us.googleusercontent.com/6nFRHrsfi6mHtkh15ID0WR3ac8tdiZ7WLCbJYQQojyYbswAm5Q8bbFLhLNL85ZnYGaqEbEcI_fkt64yygvZ-2DzfG9pui4thQM9gPF24r7ZC_WzZ0vzTmdO-t5o4wc294Xey3A7IV98HAnr7Bg1Jxw)
3. Run the Docker container locally to verify its functionality: ![](https://lh7-us.googleusercontent.com/0TgaSXMeJe3Ypped8Q0ibqZe_x-9X8Df7HVPcr7ABIhU8XiS8ul9tFQxifHeb3bHm9eEW3LzoirQMwNDW-Nuz2X4kADDyIn2j9lLBeX1drMIZuBjqq6BrKSpg4sv5-kqIc-5tjC_mY51605MhzQ64Q)
4. Tag the Docker image with the Amazon Elastic Container Registry (ECR) repository URL: ![](https://lh7-us.googleusercontent.com/axtCSLN2EpvE3BKjHI18uPM0uIPW7BOQy9MpP5d91XPOjbiIkOVq_GtGq_QXnmWfuzD4odGwvjb4WMacZFET_cGmJV3fPfgrxHR643XT5Zr9tC3V51XE5i42MdwJMLw95lPpgcmPQZUgp84YR-6_sA)
5. Authenticate Docker to the Amazon ECR:![](https://lh7-us.googleusercontent.com/4ofNVcRhkH1dZlXIA6gHs5wvsMx5wwtgjUT1TgrLtzjvPaFNPhBCoCv0NkPXFxOeU-0ECSEKChiDw5lLz-Uw3QfhB3ENN7tzfNqyCp7n4xVF6XRxfelSF_pTf9M813LUpi94xlJGXjfSSH1nMpjrvw)
6. Push the Docker image to your Amazon ECR repository: ![](https://lh7-us.googleusercontent.com/AvJD8NMaZH2r8RlWhkNBZps-0FVryeEuvdm7Orr8zcwwDCoOWDhVMJfp-tUlbkZh4XJAvm4lMHegwv1fWVnxxR0aMjOSvXvLgwysH3XOVCZ0TVP9TVTu6eGtKxkxt6YfN8QhG_n8nCMnV9ZamjKESg)



Step 3: Launch the Amazon EC2 Instance

1. In the AWS Management Console, go to the EC2 Dashboard.
2. Click “Launch Instance” and choose an Amazon Machine Image (AMI) of your choice.
3. Configure the instance settings:
4. * Choose an instance type.
   * Configure instance details and storage.
   * Add tags if necessary.
   * Configure security group rules to allow incoming traffic on port 5432 (PostgreSQL).
5. Review the configurations and launch the instance.



Step 4: Deploy Docker Image on Amazon EC2

1. SSH into your Amazon EC2 instance using the key pair associated with the instance:![](https://lh7-us.googleusercontent.com/uMdyOrdtw_eNyJe2B2-u56su4FxhHSfic4RfrUQnKhGvEj_xbPzwqO5nm8Pj8BppZhaJa--r1-HMuKoVUZSfNrKM_qf2WzGj_Fg3KWgWsVZnqRRrj1BMl0g7IoKwp_I_XXpyIBP0F5OyRA30XFfPkg)
2. Install Docker on the EC2 instance:

![](https://lh7-us.googleusercontent.com/NYK-wsc0WeuaTnwQ7t_4oWkEIYl-iEyUOBFN1FilZHSOcW8UNGNuoWBH3qZgvaFoGlPANR3WVXRg_O14Ot7DAPOweFFP8exvtMF1ycB-oJNn271T7157Ucqg8QbA-7_HfUsxzpn3XjjUGxoSaoGlLg)

![](https://lh7-us.googleusercontent.com/7CctADC_EVZSDC1XThYj_qo631j1Fp_LKuX5bSvFzu52i0fDiMl0ol7P1tybkrES6hHC9HPsffQaMI_5m7u218M1wVaewBFReYmzfiRaH-ftWM0vCRQ0Qv88LsOQmScwHvBumhvNvhKP8oXNZHWvDg)

![](https://lh7-us.googleusercontent.com/tsL9-TfHumrTK-lYj8xLz7F0Jrgio_Z7AYzl6HG4jK_U2qUyAA7dvxJ1dW7lLdK9az1jw0YdiT2wRIuKJbd_nsWxDRntAvMnPQ8vfVpBcWh8be6mxmRdhJAQ9FAWSUYuCZvFZkvKC8KfWpS09J0ycA)

![](https://lh7-us.googleusercontent.com/orfuWcUbbs_AnDRRrXoP_SphDdPRZ8oUvxrYKSGh1oIqLiRYy4wmr1IC8LnOQEm51geFSVvTEu8OaM8EzIaB_brmGui3u-O5LYeC6YK6WQ8E8pKghzsJx40Zrjhi0fM_E9DGTV8DoYxvlqxhpFWFZw)

3. Pull and run the Apache AGE Docker image on the instance:

![](https://lh7-us.googleusercontent.com/p8OdSdB632x4DGcTekVMo2b1RlEFCX9VKdDhxMfUOaSjfwBpGRRjhZVlz2DH3866Xx22LT9jb_w5A75eUe9JcMnrinVpVequRrjRZWsrITS24i_SDpMUm5VMpkb3BOPRBUFJrdkBAyUwuKJ7z0ahnA)

Step 5: Access & Query PostgreSQL Database

1. Install the PostgreSQL client on the EC2 instance:![](https://lh7-us.googleusercontent.com/yPKtED71f06maB_4FPymzRcljCkgjC3-yyCKnckA1vEulBIU5mprhKyQUAPwVPQ-__ZFWcN6lWxtTTdPDO5HBl_LTpcYCB6KZG32_bTcV3EVTJGzsMe_pyb8EVGLbbhNjSCw01_az0z8Qt6W6RklOg)
2. Connect to the Postgres database running in the Docker container:![](https://lh7-us.googleusercontent.com/yv_uYVG0g_Oe8WE3Oc7xpZSbd3UhhOk5WRVRxMG5a7uwbyHOBS2ZJ5cB45z7slHIJfO6rseFccjInwTYH9jZLWPeiVqs4Qm4OLJQ5TMjj4Y_qAlVrEWvy1WkUqRE_yt83NyZRBVBsPFkRosMcKLz7g)

You are now connected to the PostgreSQL database. Execute SQL queries and interact with the database as needed.

Conclusion

By following this comprehensive guide, you have successfully set up an AWS account, deployed the Apache AGE Docker image on an Amazon EC2 instance, and accessed the PostgreSQL database within the Docker container. This setup provides a secure and scalable environment for your data encryption and storage needs.



<!--EndFragment-->