import React, { useState } from "react";
import SignInModal from "../../pages/auth/SignInModal";
import style from "./Header.module.scss";
export default function Header() {
	const [showSignInModal, setShowSignInModal] = useState(false);
	return (
		<>
			<div className={style.header_container}>
				<div className={style.header_logo}>LOGO</div>
				<div className={style.header_menu}>Menu</div>
				<div className={style.header_end}>
					<button
						onClick={() => {
							setShowSignInModal((prev) => !prev);
						}}
					>
						Login
					</button>
				</div>
			</div>
			<SignInModal show={showSignInModal} />
		</>
	);
}
