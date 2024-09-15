## Description
This is an APIs for Admin Authentication

## Base URL
https://cabriot-admin-auth.onrender.com

- **Admin Login**
  - `POST  /api/account/admin-login/`
    ```
    {
      "email":"admin@gmail.com",
      "password":"Test@123"
    }
    ```

- **Admin Reset Password**
  - `POST  /api/account/reset-password/`
    ```
    {
      "email":"admin@gmail.com"
    }
    ```

- **Admin Reset Confirm Password**
  - `POST  /api/account/reset-password/confirm_password/`
    ```
    {
      "password":"Test@123",
      "password2":"Test@123",
      "token":"<jwt-token>"
    }
    ```

- **Admin Logout**
  - `POST  /api/account/admin-logout`
    ```
    {
      "token":"<jwt-token>"
    }
    ```
