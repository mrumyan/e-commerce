import cn from 'classnames';

import { WithLoader } from '../WithLoader/WithLoader';

import './Button.css';

export type ButtonProps = React.PropsWithChildren<{
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    handleClick?: (event: React.MouseEvent) => void;
}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ loading, disabled, className, handleClick, children, ...props }) => {
    const classNames = cn(
        'button', {
        'button_disabled': disabled || loading,
        'button_loading': loading,
    }, className);

    return (
        <button className={classNames} disabled={loading || disabled} {...props}>
            {loading ? <WithLoader loading={loading}>{children}</WithLoader> : children}
        </button>
    );
};