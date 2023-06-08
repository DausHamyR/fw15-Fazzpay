const cookieConfig = {
    cookieName: "fazzpay",
    password: "uJUS+YRA9r2T5NnWZ}N!h`G%;NGWrCpp",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }

export default cookieConfig