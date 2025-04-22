import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "placeholder-client-id",
			clientSecret:
				process.env.GITHUB_CLIENT_SECRET || "placeholder-client-secret",
			authorization: {
				params: {
					scope: "read:user user:email repo",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			// Persistir o token de acesso no JWT para uso posterior
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
