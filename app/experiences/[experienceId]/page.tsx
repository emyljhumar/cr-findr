import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";
import { CampaignsGrid } from "@/app/components/CampaignsGrid";

export default async function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	// The headers contains the user token
	const headersList = await headers();

	// The experienceId is a path param
	const { experienceId } = await params;

	// The user token is in the headers
	const { userId } = await whopSdk.verifyUserToken(headersList);

	const result = await whopSdk.access.checkIfUserHasAccessToExperience({
		userId,
		experienceId,
	});

	if (!result.hasAccess) {
		return (
			<div className="flex justify-center items-center h-screen px-8">
				<h1 className="text-xl text-red-400">
					You do not have access to this experience.
				</h1>
			</div>
		);
	}

	// Render the client-side campaigns grid
	return <CampaignsGrid />;
}
