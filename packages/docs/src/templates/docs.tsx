// import { graphql } from 'gatsby';
// import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
// import GlobalStyles, { fontWeightSemiBold } from '../components/GlobalStyles';
// import MarkdownContent, { MarkdownContainer } from '../components/MarkdownContent';

// const Layout = styled.div`
//   display: grid;
//   grid-template-areas:
//     'header header'
//     'nav content'
//     'footer footer';
//   grid-template-rows: auto 1fr auto;
//   grid-template-columns: auto 1fr;
//   min-height: 100%;

//   & > ${MarkdownContainer} {
//     grid-area: content;
//   }
// `;

// const Nav = styled.nav`
//   grid-area: nav;
// `;

// const NavSticky = styled.nav`
//   background: #00ff00;
//   position: sticky;
//   top: 0;
//   overflow: auto;
//   max-height: 100vh; //calc(100vh - 26px);
// `;

// const Header = styled.header`
//   grid-area: header;
//   background: #0000ff;
//   /* position: sticky; */
//   /* top: 0;
//   z-index: 1; */
// `;

// // const Article = styled.header`
// //   width: calc(100vw - 200px);
// //   height: calc(100vh - 26px);
// //   overflow: auto;
// //   grid-area: content;
// // `;

// // const HeaderSticky = styled.div`
// //   //background: #0000ff;
// // `;

// const Footer = styled.footer`
//   grid-area: footer;
//   background: #ff0000;
// `;

// const Styledul = styled.ul`
//   font-weight: ${fontWeightSemiBold};
// `;

// function NavList({
//   items,
// }: {
//   items: {
//     name: string;
//     children: string[];
//   }[];
// }) {
//   return (
//     <Styledul>
//       {items.map(item => (
//         <li>
//           {item.name}
//           {item.children.length > 0 && (
//             <ul>
//               {item.children.map(child => (
//                 <li>{child}</li>
//               ))}
//             </ul>
//           )}
//         </li>
//       ))}
//     </Styledul>
//   );
// }

// export default function DocTemplate({ data }: { data: any }) {
//   // useEffect(() => {
//   //   const root = document.documentElement;
//   //   const handler = () => {
//   //     root.style.setProperty('--scrolltop', root.scrollTop.toString() + 'px');
//   //   };
//   //   document.addEventListener('scroll', handler);
//   //   return () => {
//   //     document.removeEventListener('scroll', handler);
//   //   };
//   // });

//   return (
//     <>
//       <Helmet title={data.mdx.frontmatter.title} />
//       <GlobalStyles />
//       <Layout>
//         <Header>
//           <>asdasd</>
//         </Header>
//         <Nav>
//           {/* scroll and float */}
//           <NavList items={navItems} />
//         </Nav>
//         {/* <Article> */}
//         <MarkdownContent compiledMdx={data.mdx.body} />
//         {/* </Article> */}
//         <Footer>
//           footer
//           <br />
//           footer
//           <br />
//           footer
//           <br />
//         </Footer>
//       </Layout>
//     </>
//   );
// }

// export const pageQuery = graphql`
//   query ($slug: String!) {
//     mdx(fields: { slug: { eq: $slug } }) {
//       id
//       body
//       frontmatter {
//         title
//         description
//       }
//     }
//   }
// `;

// const navItems = [
//   {
//     name: 'Introduction',
//     children: [
//       'Getting Started with Redux',
//       'Installation',
//       'Core Concepts',
//       'Learning Resources',
//       'Ecosystem',
//       'Examples',
//     ],
//   },
//   {
//     name: 'Tutorials',
//     children: ['Tutorials Index', 'Quick Start', 'TypeScript Quick Start'],
//   },
//   {
//     name: 'Recipes',
//     children: [
//       'Recipes: Index',
//       'Configuring Your Store',
//       'Usage With TypeScript',
//       'Migrating to Redux',
//       'Using Object Spread Operator',
//       'Reducing Boilerplate',
//       'Server Rendering',
//       'Writing Tests',
//       'Computing Derived Data',
//       'Implementing Undo History',
//       'Isolating Redux Sub-Apps',
//       'Code Splitting',
//       'Troubleshooting',
//     ],
//   },
//   {
//     name: 'Understanding Redux',
//     children: ['Thinking in Redux', 'History and Design'],
//   },
//   {
//     name: 'FAQ',
//     children: [
//       'FAQ Index',
//       'General',
//       'Reducers',
//       'Organizing State',
//       'Store Setup',
//     ],
//   },
// ];
