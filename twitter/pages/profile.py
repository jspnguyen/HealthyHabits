"""The profile page. This file includes examples abstracting complex UI into smaller components."""
import reflex as rx
from twitter.state.base import State
from twitter.state.home import HomeState
from twitter.templates import template
from twitter import styles

from ..components import container

"""
Header
"""
header = rx.text(
                "Profile",
                background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
                background_clip="text",
                font_weight="bold",
                font_size="4em", 
                text_align = "center", 
               )

"""
Profile Icon
"""
Profile_Icon = rx.vstack(rx.avatar(size="2xl", src="/favicon.ico",),
                        rx.heading("Hi, ", HomeState.form_data["fName"], "!", font_size="4em", padding_bottom="0.4em",background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
                        background_clip="text",
                        font_weight="bold",)
                        )
"""
Download Profile
"""
Download_Profile = rx.center(
                                rx.button("Download Your Information", 
                                on_click=rx.download(
                                    url="/userInfo.pdf", 
                                    filename="{username}Information.pdf",
                                ),
                                ), padding_bottom="1.5em"
                            )
"""
Email_Section
"""
Email_Section = rx.center(
                            rx.hstack(
                                rx.button(
                                    "Email Report to Physician",
                                ),
                                rx.button(
                                    "Email Report to Myself",
                                ),
                                padding_top="1em"
                            ),
                        )
"""
Profile_Editor
"""
Profile_Editor = rx.center(
                            rx.vstack(
                                    rx.text("Edit Your Profile Information Below", font_size="2em", padding_bottom="0.5em"),
                                    rx.form(
                                        rx.vstack(
                                                    rx.hstack(
                                                        rx.center(
                                                            rx.vstack(
                                                                rx.text(HomeState.form_data["fName"], font_weight="bold", font_size="md", padding_bottom="0.9em",background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", background_clip="text",),
                                                                rx.text(HomeState.form_data["lName"], font_weight="bold", font_size="md", padding_bottom="0.9em",background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", background_clip="text",),
                                                                rx.text(HomeState.form_data["age"], font_weight="bold", font_size="md", padding_bottom="0.9em",background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", background_clip="text",),
                                                                rx.text(HomeState.form_data["email"], font_weight="bold", font_size="md", padding_bottom="0.9em",background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", background_clip="text",),
                                                                rx.text(HomeState.form_data["address"], font_weight="bold", font_size="md", padding_bottom="0.9em",background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", background_clip="text",),
                                                                rx.text(HomeState.form_data["physician"], font_weight="bold", font_size="md", padding_bottom="0.9em",background_image="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)", background_clip="text",),
                                                                ),
                                                            align_items = "center",
                                                            width = "50vh",
                                                            ),
                                                        rx.center(
                                                            rx.vstack(
                                                                rx.input(placeholder= "First Name ", id="fName"),
                                                                rx.input(placeholder="Last Name ", id="lName"),
                                                                rx.input(placeholder="Age ", id="age"),
                                                                rx.input(placeholder="Email Address ", id="email"),
                                                                rx.input(placeholder="Address ", id="address"),
                                                                rx.input(placeholder="Primary Physician Email ", id="physician"),
                                                                align_items = "center",
                                                                width = "25vh",
                                                                ),
                                                                rx.spacer(),
                                                            ),
                                                    ),
                                                    rx.button("Update Information", type_="submit", on_click=HomeState.alert, align_items = "center", padding = "2em",  bg="linear-gradient(271.68deg, #EE756A 0.75%, #756AEE 88.52%)",
                color="white",
                _hover={"shadow": "0 4px 60px 0 rgba(0, 0, 0, 0.3), 0 4px 16px 0 rgba(0, 0, 0, 0.3)"}),
                                        ),
                                        on_submit=HomeState.handle_submit,

                            ),
                            ),
                            )





@template(route="/profile", title="Profile", image="/profile.png")
def profile() -> rx.Component:
    """The profile page.c
    

    Returns:
        The UI for the profile page.
    """
    return rx.box(
        header, 
        rx.divider(),
        rx.hstack(
            rx.vstack(
                Profile_Icon,
                Profile_Editor,
                width = "100%", 
                align_items = "center",
            ),
            width = "100%",
            padding = "2em",
        )
    )
