class HomeController {
  async index(req, res) {
    return res.json('ok');
  }
}

export default new HomeController();
