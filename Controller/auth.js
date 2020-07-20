const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { catchAsync, AppError } = require("./Misc/errorHandler");
const User = require("../Models/user");

const { loginSchema } = require("../Models/validate");

exports.signup = catchAsync(async (req, res, next) => {
  const { error } = loginSchema(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const email = await User.findOne({ email: req.body.email });
  if (email) {
    return next(new AppError("User Alredy Exists!!", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const userTo = {
    email: req.body.email,
    password: hashedPass,
  };

  const user = new User(userTo);
  user.save();

  res.send({
    success: true,
    error: false,
    message: "User Created!!",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  email = req.body.email;
  password = req.body.password;

  const { error } = loginSchema(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new AppError("Email or password incorrect", 401));
  }

  const validePass = await bcrypt.compare(password, user.password);

  if (!validePass) {
    return next(new AppError("Email or password incorrect", 401));
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    "gphgphgphgph",
    {
      expiresIn: "6h",
    }
  );
  user.sessToken.push(token);

  const filtered = [];
  let verify;

  user.sessToken.map((el) => {
    try {
      verify = jwt.verify(el, "gphgphgphgph");
      if (verify) {
        filtered.push(el);
      }
    } catch (err) {}
  });
  user.sessToken = filtered;

  user.save();

  return res.status(200).send({
    success: true,
    error: false,
    message: "Login successful",
    token: token,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  let user = await User.findOne({ _id: req.user._id });
  filtered = [];
  user.sessToken.map((el) => {
    if (el != token) {
      filtered.push(el);
    }
  });
  user.sessToken = filtered;
  user.save();
  res.status(200).send({ succes: true, error: false, message: "Logout done" });
});

exports.checkauth = catchAsync(async (req, res, next) => {
  return res.status(200).send({
    success: true,
    error: false,
  });
});
