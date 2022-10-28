import { NextApiRequest } from "next";
import NFTService from "backend/services/nft.service";
import { DefaultResponse } from "backend/types/response";

interface ControllerInterface {
	POST: (A: NextApiRequest) => Promise<DefaultResponse>;
}

const POST = async (req: NextApiRequest): Promise<DefaultResponse> => {
	try {
		// TODO: must return this promise
		NFTService.createNFT(req.body.properties);
		return Promise.resolve({
			status: 200,
			message: "message",
		});
	} catch (error) {
		console.info("error happened while handling POST /api/nft");
		console.error(error);
		return Promise.resolve({
			status: 500,
			message: "Internal server error",
		});
	}
};

const NFTController: ControllerInterface = {
	POST,
};

export default NFTController;
