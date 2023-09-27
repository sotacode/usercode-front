import {
	Button,
	Kbd,
	Link,
	Input,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
	Image,
} from "@nextui-org/react";

import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";


export const Navbar = () => {

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image
							src="/logousercode.png"
							alt="Logo USERCODE"
							width={50}
						/>
						{/* <p className="font-bold text-inherit">USERCODE</p> */}
					</NextLink>
				</NavbarBrand>
				<div className="hidden sm:flex gap-4 justify-start ml-2">
					<NavbarItem>
						<NextLink
							className={clsx(
								linkStyles({ color: "foreground" }),
								"data-[active=true]:text-primary data-[active=true]:font-medium"
							)}
							color="foreground"
							href="#"
						>
							item1
						</NextLink>
					</NavbarItem>

				</div>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
				<ThemeSwitch />
			</NavbarContent>


			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					<NavbarMenuItem>
						<Link
							href="#"
							size="lg"
						>
							item1
						</Link>
					</NavbarMenuItem>
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
