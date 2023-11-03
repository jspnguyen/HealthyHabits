"""Welcome to Reflex! This file outlines the steps to create a basic app."""
import reflex as rx

from healthyhabits import styles
from .pages import home, login, signup, reports, profile
from .state.base import State

app = rx.App(state=State)
app.add_page(login, route = "/")
app.add_page(signup, route = "/signup")
app.add_page(home, route="/home", on_load=State.check_login())
app.add_page(reports, route = "/reports", on_load=State.check_login())
app.add_page(profile, route = "/profile", on_load=State.check_login())

app.compile()
