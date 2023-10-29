"""Shared auth layout."""
import reflex as rx

from ..components import container


def auth_layout(*args):
    """The shared layout for the login and sign up pages."""
    return rx.box(
        container(
            rx.heading(
                rx.text(
                    "Healthy Habits",
                    background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
                    background_clip="text",
                    font_weight="bold",
                    font_size="3.5em",
                ),
                rx.span("The Help You Always Needed"),
                display="flex",
                flex_direction="column",
                align_items="center",
                text_align="center",
            ),
            rx.text(
                "Sign in or sign up to get started",
                color="gray.500",
                font_weight="medium",
            ),
            *args,
            border_top_radius="lg",
            box_shadow="0 4px 60px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08)",
            display="flex",
            flex_direction="column",
            align_items="center",
            py=12,
            gap=4,
        ),
        h="100vh",
        pt=16,
        background="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
        background_repeat="no-repeat",
        background_size="cover",
    )
