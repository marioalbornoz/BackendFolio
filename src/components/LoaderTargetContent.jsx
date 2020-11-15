import React from "react"
import ContentLoader from "react-content-loader"

const LoaderTargetContent = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={460}
    viewBox="0 0 1200 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-109" y="-27" rx="2" ry="2" width="1378" height="81" /> 
  </ContentLoader>
)

export default LoaderTargetContent;
