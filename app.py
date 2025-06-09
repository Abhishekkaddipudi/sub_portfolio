from flask import Blueprint, render_template

portfolio_bp = Blueprint(
    "portfolio",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/portfolio/static",
)


@portfolio_bp.route("/")
def index():
    return render_template("portfolio.html")
