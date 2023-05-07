import styled from "styled-components";

const SNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	width: 100%;
	top: 0;
	background-color: red;
	height: 80px;
	font-size: 12px;
`;

const SCol = styled.div`
	display: flex;
	align-items: center;
`;

const SLogo = styled.svg`
	margin-right: 50px;
`;

const SItems = styled.ul`
	display: flex;
	align-items: center;
`;

const SItem = styled.li`
	margin-right: 20px;
`;

function Header() {
	return (
		<SNav>
			<SCol>
				<SLogo />
				<SItems>
					<SItem>Home</SItem>
					<SItem>Tv Shows</SItem>
				</SItems>
			</SCol>
			<SCol>
				<button>search</button>
			</SCol>
		</SNav>
	);
}
export default Header;
