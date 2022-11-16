import {
	SyntheticEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { debounce } from "lodash";
import { Button, Spinner } from "shared-ui";
import {
	PickerArea,
	TraitPickerArea,
	DisplayArea,
	GenderPicker,
	ImageHolder,
	ActionArea,
} from "./styled";
import abi from "./talentNFT.json";
import { useTrait } from "./hooks/use-trait";
import { Trait } from "./trait";
import { ShuffleButton } from "./suffle-button";
import { Props } from "./types";
import { ethers } from "ethers";
import { MINT_ERROR_CODES } from "./error-codes";

const CANVAS_SIDE = 552;

export const NFTPicker = ({ openModal, setImageSource }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [gender, setGender] = useState<"male" | "female">("male");
	const mintNFT = useCallback(async () => {
		// @ts-ignore
		const defaultProvider = new ethers.providers.Web3Provider(ethereum);
		const accounts = await defaultProvider.send("eth_requestAccounts", []);
		// @ts-ignore
		const provider = new ethers.providers.JsonRpcProvider(
			"https://alfajores-forno.celo-testnet.org"
		);
		const contract = new ethers.Contract(
			"0x29de1f2D9b0644f1C5Bc445A29e5706FB890Bff3",
			abi.abi,
			provider
		);
		const isAvailable = await contract.isCombinationAvailable("dasd.png");
		const isWhitlisted = await contract.isWhitelisted(accounts[0]);

		if (!isAvailable) {
			throw MINT_ERROR_CODES.COMBINATION_TAKEN;
		}
		if (!isWhitlisted) {
			throw MINT_ERROR_CODES.ACCOUNT_IN_BLACKLIST;
		}
	}, []);
	const [generatingImage, setGeneratingImage] = useState(true);

	const traits = {
		backgroundTrait: useTrait({
			name: "background",
			description: "Background",
			maxElements: { male: 12, female: 12 },
			gender,
		}),
		backgroundObjectTrait: useTrait({
			name: "background-object",
			description: "Background Object",
			maxElements: { male: 21, female: 21 },
			gender,
		}),
		skinTrait: useTrait({
			name: "body",
			description: "Skin",
			maxElements: { male: 17, female: 17 },
			gender,
		}),
		clothingTrait: useTrait({
			name: "clothing",
			description: "Clothes",
			maxElements: { male: 24, female: 24 },
			gender,
		}),
		hairTrait: useTrait({
			name: "hair",
			description: "Hair",
			maxElements: { male: 25, female: 27 },
			gender,
		}),
		mouthTrait: useTrait({
			name: "mouth",
			description: "Mouth",
			maxElements: { male: 12, female: 11 },
			gender,
		}),
		eyesTrait: useTrait({
			name: "eyes",
			description: "Eyes",
			maxElements: { male: 11, female: 12 },
			gender,
		}),
		thinkingTrait: useTrait({
			name: "thinking",
			description: "Thinking",
			maxElements: { male: 17, female: 17 },
			gender,
		}),
	};

	const openMintModal = useCallback(
		async (event: SyntheticEvent) => {
			try {
				await mintNFT();
				// todo: call backend

				if (typeof window !== "undefined" && canvasRef.current) {
					//const url = canvasRef.current.toDataURL("image/png");
					//setImageSource(url);
					openModal(event);
				}
			} catch (err) {
				alert(err);
			}
		},
		[openModal, canvasRef.current]
	);

	useEffect(
		debounce(() => {
			if (typeof window !== "undefined" && canvasRef.current) {
				setGeneratingImage(true);
				const canvasContext = canvasRef?.current.getContext("2d");
				canvasContext?.clearRect(0, 0, CANVAS_SIDE, CANVAS_SIDE);
				const promisesList: Promise<CanvasImageSource>[] = [];
				const traitList = Object.keys(traits);
				traitList.forEach((trait) => {
					// @ts-ignore
					if (traits[trait].currentSelection !== -1) {
						// @ts-ignore
						if (traits[trait].currentSelection !== -1) {
							const traitImage = new Image();
							//traitImage.crossOrigin = 'Anonymous';
							// @ts-ignore
							traitImage.src = traits[trait].image;
							const traitPromise = new Promise<HTMLImageElement>(
								(resolve, reject) => {
									traitImage.onload = () => {
										resolve(traitImage);
									};
									traitImage.onerror = () => {
										reject(null);
									};
								}
							);
							promisesList.push(traitPromise);
						}
					}
				});
				Promise.all(promisesList).then((images) => {
					images.forEach((image) => {
						canvasContext?.drawImage(image, 0, 0, CANVAS_SIDE, CANVAS_SIDE);
					});
					setGeneratingImage(false);
				});
			}
		}, 100),
		[
			traits.hairTrait,
			traits.backgroundTrait,
			traits.clothingTrait,
			traits.clothingTrait,
			traits.eyesTrait,
			traits.mouthTrait,
			traits.skinTrait,
			traits.thinkingTrait,
			traits.backgroundObjectTrait,
		]
	);

	const shuffleCombination = useCallback(() => {
		Object.values(traits).forEach((trait) => trait.shuffle());
	}, []);

	useEffect(() => {
		shuffleCombination();
		setGeneratingImage(false);
	}, []);

	return (
		<>
			<section>
				<PickerArea>
					<TraitPickerArea>
						<Trait
							trait={traits.backgroundTrait.name}
							description={traits.backgroundTrait.description}
							onTraitSelection={traits.backgroundTrait.updateCurrentSelection}
							currentTraitNumber={traits.backgroundTrait.currentSelection}
							totalNumberOfTraits={traits.backgroundTrait.maxElements[gender]}
						/>
						<Trait
							trait={traits.skinTrait.name}
							description={traits.skinTrait.description}
							onTraitSelection={traits.skinTrait.updateCurrentSelection}
							currentTraitNumber={traits.skinTrait.currentSelection}
							totalNumberOfTraits={traits.skinTrait.maxElements[gender]}
						/>
						<Trait
							trait={traits.hairTrait.name}
							description={traits.hairTrait.description}
							onTraitSelection={traits.hairTrait.updateCurrentSelection}
							currentTraitNumber={traits.hairTrait.currentSelection}
							totalNumberOfTraits={traits.hairTrait.maxElements[gender]}
						/>
						<Trait
							trait={traits.clothingTrait.name}
							description={traits.clothingTrait.description}
							onTraitSelection={traits.clothingTrait.updateCurrentSelection}
							currentTraitNumber={traits.clothingTrait.currentSelection}
							totalNumberOfTraits={traits.clothingTrait.maxElements[gender]}
						/>
					</TraitPickerArea>
					<DisplayArea>
						<GenderPicker>
							<Button
								text="Male"
								type="button"
								variant={gender === "male" ? "quaternary" : "secondary"}
								fullWidth
								onClick={() => setGender("male")}
							/>
							<Button
								text="Female"
								type="button"
								variant={gender === "female" ? "quaternary" : "secondary"}
								fullWidth
								onClick={() => setGender("female")}
							/>
						</GenderPicker>
						<ImageHolder>
							<Spinner isShown={generatingImage} />
							<canvas
								ref={canvasRef}
								width={`${CANVAS_SIDE}px`}
								height={`${CANVAS_SIDE}px`}
							/>
						</ImageHolder>
					</DisplayArea>
					<TraitPickerArea>
						<Trait
							trait={traits.mouthTrait.name}
							description={traits.mouthTrait.description}
							onTraitSelection={traits.mouthTrait.updateCurrentSelection}
							currentTraitNumber={traits.mouthTrait.currentSelection}
							totalNumberOfTraits={traits.mouthTrait.maxElements[gender]}
						/>
						<Trait
							trait={traits.eyesTrait.name}
							description={traits.eyesTrait.description}
							onTraitSelection={traits.eyesTrait.updateCurrentSelection}
							currentTraitNumber={traits.eyesTrait.currentSelection}
							totalNumberOfTraits={traits.eyesTrait.maxElements[gender]}
						/>
						<Trait
							trait={traits.thinkingTrait.name}
							description={traits.thinkingTrait.description}
							onTraitSelection={traits.thinkingTrait.updateCurrentSelection}
							currentTraitNumber={traits.thinkingTrait.currentSelection}
							totalNumberOfTraits={traits.thinkingTrait.maxElements[gender]}
						/>
						<Trait
							trait={traits.backgroundObjectTrait.name}
							description={traits.backgroundObjectTrait.description}
							onTraitSelection={
								traits.backgroundObjectTrait.updateCurrentSelection
							}
							currentTraitNumber={traits.backgroundObjectTrait.currentSelection}
							totalNumberOfTraits={
								traits.backgroundObjectTrait.maxElements[gender]
							}
						/>
					</TraitPickerArea>
				</PickerArea>
				<ActionArea>
					<div>
						<ShuffleButton callback={shuffleCombination} />
					</div>
					<div>
						<Button
							text="Mint your NFT"
							type="button"
							variant="primary"
							fullWidth
							onClick={openMintModal}
						/>
					</div>
				</ActionArea>
			</section>
		</>
	);
};
