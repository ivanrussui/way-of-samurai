import React, {ReactNode, Suspense} from 'react';
import {Preloader} from '../Preloader/Preloader';

type Props = {
    children: ReactNode
}

export const SuspenseWrapper = ({children}: Props) => {
    return (
        <Suspense fallback={<Preloader/>}>
            {children}
        </Suspense>
    );
};
