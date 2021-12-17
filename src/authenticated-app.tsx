import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用 grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeeaderLeft>
        <HeeaderRight>
          <button onClick={logout}>登出</button>
        </HeeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>Aside</Aside>
      <Footer>Footer</Footer>
      {/* <header>
        <button onClick={logout}>登出</button>
      </header>
      <main>
        <ProjectListScreen />
      </main> */}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  /* grid-template-rows 属性定义每一行的行高 */
  /* fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。 */
  grid-template-rows: 6rem 1fr 6rem;
  /* grid-template-columns 属性定义每一列的列宽 */
  grid-template-columns: 20rem 1fr 20rem;
  /* 网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas 属性用于定义区域。 */
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  /* grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）。 */
  /* grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式 */
  grid-gap: 10rem;
  height: 100vh;
`;

// grid-area: 用来给 grid 子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeeaderRight = styled.div``;
const Main = styled.header`
  grid-area: main;
`;
const Nav = styled.header`
  grid-area: nav;
`;
const Aside = styled.header`
  grid-area: aside;
`;
const Footer = styled.header`
  grid-area: footer;
`;

// const PageHeader = styled.header`
// background-color: gray;
// height: 6rem;
// `

// const Main = styled.main`
// height: calc(100vh - 6rem)
// `
