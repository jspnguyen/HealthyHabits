"""Sign up page. Uses auth_layout to render UI shared with the login page."""
import reflex as rx
from healthyhabits.layouts import auth_layout
from healthyhabits.state.auth import AuthState


def signup():
    """The sign up page."""
    return auth_layout(
        rx.box(
            rx.input(placeholder="Username", on_blur=AuthState.set_username, mb=4),
            rx.input(
                type_="password",
                placeholder="Password",
                on_blur=AuthState.set_password,
                mb=4,
            ),
            rx.input(
                type_="password",
                placeholder="Confirm password",
                on_blur=AuthState.set_confirm_password,
                mb=4,
            ),
            rx.button(
                "Sign up",
                on_click=AuthState.signup,
                bg="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
                color="white",
                _hover={"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"},
            ),
            display="flex",
            flex_direction="column",
            align_items="center",
            bg="white",
            border="1px solid #eaeaea",
            p=4,
            width="500px",
            border_radius="lg",
        ),
        rx.text(
            "Already have an account? ",
            rx.link("Sign in here.", href="/", color="blue.500"),
            color="gray.600",
        ),
    )
