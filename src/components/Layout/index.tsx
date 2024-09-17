import { NavbarComp } from '../NavbarComp';
import { useLoader } from '../../utils/LoaderProv';
import { Loader } from '../Loader';

export const Layout = ({ children }: any) => {
    const { isLoading } = useLoader();
    return (
        <>

            <NavbarComp />
            {isLoading && <Loader />}
            {children}
        </>
    )
}