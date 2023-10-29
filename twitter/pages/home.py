"""The home page. This file includes examples abstracting complex UI into smaller components."""
import reflex as rx
from twitter.state.home import HomeState
from twitter.templates import template
from twitter import styles
from twitter.state.home import HomeState

from ..components import container


@template(route="/home", title="Home", image="/home.png")
def home() -> rx.Component:
    """The home page.
    Returns:
        The UI for the home page.
    """
    return rx.box(
        rx.text(
                "Home",
                background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
                background_clip="text",
                font_weight="bold",
                font_size="4em", 
                text_align = "center", 
               ),
        rx.divider(),
        rx.hstack(
            rx.vstack(
                rx.heading(
                    "Start Your Recording Now", 
                    padding_top = "0.5em",
                ),
                rx.box(
                    rx.image(
                    src=HomeState.image, 
                    border_radius="40px",
                    object_fit = "contain",
                    object_position = "center",
                    ), 
                    align_items = "center",
                    width = "400px",
                    height = "280px",
                    # border_color="#EE756A",
                    # border_radius="40px",
                    # border_width="thick",
                ),
                rx.spacer(),
                width = "50%",
                ),
            rx.vstack(
                    rx.button(
                        "Toggle Recording", 
                        on_click=HomeState.setStopRecord,
                        bg="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
                        color="white",
                        _hover={"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"}
                    ),
                    align_items = "center",
                    width = "50%",
            ),
            align_items = "center",
            padding = "2em",
            width = "100%",
            height = "60%"
        ),
        rx.divider(),
        rx.heading("Emotion: ", HomeState.top_emotions[0], font_size="4em", padding_bottom="0.4em",background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
        background_clip="text",
        font_weight="bold",)
    )
