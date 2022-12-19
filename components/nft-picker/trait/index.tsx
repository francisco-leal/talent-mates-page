import { Button, Typography } from "shared-ui";
import {
	TraitSwitchButton,
	TraitSwitchInfo,
	TraitArea,
	TraitSwitchArea,
	TraitTitle,
	CommunityLevel,
	TraitTooltipWrapper,
	TraitTooltip,
} from "./styled";
import { TraitProps } from "./types";
import TRAITS from "libs/traits/list.json";

const numberToTraitNumber = (value: Number): string => {
	let realValue = value;
	if (realValue > 5) {
		// @ts-ignore
		realValue = 3 + (!!window.accountTier ? window.accountTier : 0);
	}

	if (realValue < 10) {
		// @ts-ignore
		return TRAITS["body"]["female"][`0${realValue}`];
	} else {
		// @ts-ignore
		return TRAITS["body"]["female"][realValue.toString()];
	}
};

export const Trait = ({
	description,
	onTraitSelection,
	currentTraitNumber,
	totalNumberOfTraits,
}: TraitProps) => (
	<TraitArea>
		<TraitTitle>
			<TraitTooltipWrapper>
				<Typography type="body1" text={description} color="BLACK" />
				{description == "Skin" && (
					<>
						<div>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0V0ZM8.16667 3.33333C8.36445 3.33333 8.55779 3.39198 8.72224 3.50186C8.88669 3.61174 9.01486 3.76792 9.09055 3.95065C9.16624 4.13338 9.18604 4.33444 9.14746 4.52842C9.10887 4.7224 9.01363 4.90059 8.87378 5.04044C8.73392 5.18029 8.55574 5.27553 8.36176 5.31412C8.16778 5.3527 7.96671 5.3329 7.78399 5.25721C7.60126 5.18153 7.44508 5.05335 7.3352 4.8889C7.22532 4.72445 7.16667 4.53111 7.16667 4.33333C7.16667 4.06812 7.27203 3.81376 7.45956 3.62623C7.6471 3.43869 7.90145 3.33333 8.16667 3.33333ZM9.66667 12.3333H7C6.82319 12.3333 6.65362 12.2631 6.5286 12.1381C6.40358 12.013 6.33334 11.8435 6.33334 11.6667C6.33334 11.4899 6.40358 11.3203 6.5286 11.1953C6.65362 11.0702 6.82319 11 7 11H7.5C7.54421 11 7.5866 10.9824 7.61786 10.9512C7.64911 10.9199 7.66667 10.8775 7.66667 10.8333V7.83333C7.66667 7.78913 7.64911 7.74674 7.61786 7.71548C7.5866 7.68423 7.54421 7.66667 7.5 7.66667H7C6.82319 7.66667 6.65362 7.59643 6.5286 7.4714C6.40358 7.34638 6.33334 7.17681 6.33334 7C6.33334 6.82319 6.40358 6.65362 6.5286 6.5286C6.65362 6.40357 6.82319 6.33333 7 6.33333H7.66667C8.02029 6.33333 8.35943 6.47381 8.60948 6.72386C8.85953 6.97391 9 7.31304 9 7.66667V10.8333C9 10.8775 9.01756 10.9199 9.04882 10.9512C9.08008 10.9824 9.12247 11 9.16667 11H9.66667C9.84348 11 10.0131 11.0702 10.1381 11.1953C10.2631 11.3203 10.3333 11.4899 10.3333 11.6667C10.3333 11.8435 10.2631 12.013 10.1381 12.1381C10.0131 12.2631 9.84348 12.3333 9.66667 12.3333Z"
									fill="#536471"
								/>
							</svg>
							<TraitTooltip>
								You can use your skin to showcase your community level, the
								higher the level that you are in the community the more access
								to skins you have.
							</TraitTooltip>
						</div>
					</>
				)}
			</TraitTooltipWrapper>
			{description == "Skin" && (
				<CommunityLevel>
					<Typography
						type="body2"
						text={numberToTraitNumber(currentTraitNumber)}
						color="WHITE"
					/>
				</CommunityLevel>
			)}
		</TraitTitle>
		<TraitSwitchArea>
			<Button
				type="button"
				variant="quaternary"
				onClick={() => onTraitSelection(-1)}
			>
				<TraitSwitchButton>--W</TraitSwitchButton>
			</Button>
			<Button
				type="button"
				variant="quaternary"
				onClick={() => onTraitSelection(1)}
			>
				<TraitSwitchButton>--E</TraitSwitchButton>
			</Button>
			<TraitSwitchInfo>
				<Typography type="body1" color="BLACK">
					<>
						{currentTraitNumber !== -1 ? (
							<>
								<>{currentTraitNumber}</>
								<span style={{ color: "#697F8F" }}>
									/{totalNumberOfTraits.toString()}
								</span>
							</>
						) : (
							"None"
						)}
					</>
				</Typography>
			</TraitSwitchInfo>
		</TraitSwitchArea>
	</TraitArea>
);
