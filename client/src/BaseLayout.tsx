
import Menu from "./componenets/Menu"


const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <div>
            <Menu/>
            <div>{children}</div>
        </div>
     
    </div>
  )
}

export default BaseLayout