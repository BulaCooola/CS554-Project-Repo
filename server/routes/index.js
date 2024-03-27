import homeRoutes from './home.js'

const constructorMethod = (app) => {
  app.use("/", homeRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;
