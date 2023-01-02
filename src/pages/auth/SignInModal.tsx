import React, { useCallback, useEffect, useState } from "react";
import {
	ClientSafeProvider,
	getProviders,
	LiteralUnion,
	signIn,
	signOut,
	useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useRouter } from "next/router";
import { NextPage } from "next";
type SignInProps = {
	show: boolean;
};

const SignInModal: NextPage<SignInProps> = (props) => {
	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null);

	const { data: sessionData } = useSession();

	const { show } = props;
	const { query } = useRouter();
	useEffect(() => {
		console.log("Show", show);
		getProviders().then((res) => {
			setProviders(res);
		});
	}, []);
	const callbackUrl: string | undefined = query.callbackUrl as
		| string
		| undefined;

	return (
		<div
			className={
				show ? "sign_in_modal__container_expend" : "sign_in_modal__container"
			}
		>
			{show && sessionData ? (
				<div className="v-box center gap">
					{sessionData.user?.name}
					{sessionData.user?.email}
					<img
						src={
							sessionData.user?.image || "https://picsum.photos/100/100.webp"
						}
						alt="userImage"
						width={100}
						height={100}
					/>
					<button onClick={() => signOut()}>Sign Out</button>
				</div>
			) : (
				providers &&
				show &&
				Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<button onClick={() => signIn(provider.id, { callbackUrl })}>
							Sign in with {provider.name}
						</button>
					</div>
				))
			)}
		</div>
	);
};

export default SignInModal;
