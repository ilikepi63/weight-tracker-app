import bcrypt from "bcryptjs";

export const generateHash = async (password: string) => new Promise<string | Error>((resolve, reject) => {
	bcrypt.genSalt(10, (err: Error | null, salt: string) => {

		if (err) {
			resolve(err);
			return;
		}

		bcrypt.hash(password, salt,  (err: Error | null, hash: string) => {

			if (err) {
				resolve(err);
				return;
			}

			resolve(hash);
		});
	});
});

export const compareHash = async (password: string, hash: string) => bcrypt.compare(password, hash);