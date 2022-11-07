import styled, { css } from "styled-components";
import { fontNormal } from "../typography";
import { COLORS } from "../colors";
import { StyledButtonProps, VariantTypeEnum } from "./types";

const primaryStyles = css`
	background-color: ${COLORS.LIGHT_PURPLE};
	color: ${COLORS.WHITE};
	padding: 8px 32px;
	border-radius: 32px;

	:hover {
		background-color: ${COLORS.LIGHTER_PURPLE};
	}
`;

const secondaryStyles = css`
	color: ${COLORS.BLACK};
	padding: 8px 32px;
	display: flex;
	align-items: center;
	border-radius: 32px;
	border: 1px solid ${COLORS.DARK_BLUE};
	background-color: transparent !important;

	:hover {
		background-color: ${COLORS.LIGHTER_GREY} !important;
	}
`;

const tertiaryStyles = css`
	background-color: ${COLORS.WHITE};
	color: ${COLORS.BLACK};
	padding: 8px 32px;
	border-radius: 32px;

	:hover {
		background-color: ${COLORS.LIGHTER_GREY};
	}
`;

const quaternaryStyles = css`
	width: 38px;
	height: 38px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${COLORS.BLACK};
	color: ${COLORS.WHITE};
	border-radius: 50px;
	border: none;

	:hover {
		background-color: ${COLORS.LIGHT_BLACK};
	}
`;

const pentanaryStyles = css`
	background-color: ${COLORS.LIGHT_YELLOW};
	color: ${COLORS.BLACK};
	padding: 8px 32px;
	border-radius: 32px;

	:hover {
		background-color: ${COLORS.SUPER_LIGHT_YELLOW};
	}
`;

const hexanaryStyles = css`
	color: ${COLORS.LIGHT_YELLOW};
	padding: 8px 32px;
	display: flex;
	align-items: center;
	border-radius: 32px;

	:hover {
		background-color: ${COLORS.LIGHT_BLACK};
	}
`;

const septenaryStyles = css`
	background-color: ${COLORS.YELLOW};
	color: ${COLORS.BLACK};
	padding: 8px 32px;
	display: flex;
	border-radius: 32px;

	:hover {
		background-color: ${COLORS.LIGHTER_YELLOW};
	}
`;

const octonaryStyles = css`
	background-color: ${COLORS.WHITE};
	color: ${COLORS.LIGHT_PURPLE};
	border: 2px solid ${COLORS.LIGHT_PURPLE};
	padding: 12px 32px;
	display: flex;
	border-radius: 32px;
	box-sizing: border-box;
`;

export const fullWidthStyles = css`
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export const ButtonContainer = styled.button<StyledButtonProps>`
	${fontNormal}
	font-style: normal;
	font-weight: 700;
	font-size: 16px;
	line-height: 24px;
	text-decoration: none;
	cursor: pointer;
	display: flex;
	outline: none;
	transition-duration: 0.25s;

	${({ variant }) => {
		switch (variant) {
			case VariantTypeEnum.SECONDARY:
				return secondaryStyles;
			case VariantTypeEnum.TERTIARY:
				return tertiaryStyles;
			case VariantTypeEnum.QUATERNARY:
				return quaternaryStyles;
			case VariantTypeEnum.PENTANARY:
				return pentanaryStyles;
			case VariantTypeEnum.HEXANARY:
				return hexanaryStyles;
			case VariantTypeEnum.SEPTENARY:
				return septenaryStyles;
			case VariantTypeEnum.OCTONARY:
				return octonaryStyles;
			case VariantTypeEnum.PRIMARY:
			default:
				return primaryStyles;
		}
	}}

	${({ fullWidth }: { fullWidth: boolean }) => {
		switch (fullWidth) {
			case true:
				return fullWidthStyles;
			case false:
				return "";
			default:
				return "";
		}
	}}
`;

export const ButtonLinkContainer = styled.a<StyledButtonProps>`
	${fontNormal}
	font-style: normal;
	font-weight: 700;
	font-size: 16px;
	line-height: 24px;
	text-decoration: none;
	cursor: pointer;
	display: flex;
	transition-duration: 0.25s;
	outline: none;

	${({ variant }) => {
		switch (variant) {
			case VariantTypeEnum.SECONDARY:
				return secondaryStyles;
			case VariantTypeEnum.TERTIARY:
				return tertiaryStyles;
			case VariantTypeEnum.QUATERNARY:
				return quaternaryStyles;
			case VariantTypeEnum.PENTANARY:
				return pentanaryStyles;
			case VariantTypeEnum.HEXANARY:
				return hexanaryStyles;
			case VariantTypeEnum.SEPTENARY:
				return septenaryStyles;
			case VariantTypeEnum.OCTONARY:
				return octonaryStyles;
			case VariantTypeEnum.PRIMARY:
			default:
				return primaryStyles;
		}
	}}
`;
