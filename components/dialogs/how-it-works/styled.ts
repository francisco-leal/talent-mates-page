import styled from "styled-components";
import { Button, COLORS } from "shared-ui";

export const Container = styled.section`
	position: relative;
	min-width: 500px;
	max-width: 720px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 44px 40px 40px;
	gap: 18px;
	background: ${COLORS.WHITE};
	box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
	border-radius: 24px;
	text-align: center;

	div {
		display: flex;
		flex-direction: column;
		gap: 18px;
		overflow: scroll;
	}

	@media (max-width: 768px) {
		min-width: 100%;
		max-width: 100%;
		max-height: 84%;
		padding: 24px;

		span {
			font-size: 16px;
		}
	}
`;

export const XArea = styled.div`
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
	overflow: hidden !important;
`;

export const ActionArea = styled.div`
	display: flex;
	margin-top: 24px;
	overflow: hidden !important;

	@media (max-width: 768px) {
		margin: 0;
	}
`;

export const StyledButton = styled(Button)`
	padding: 8px 32px;
`;

export const TextArea = styled.div`
	overflow: hidden !important;
`;
