import './Switch.css';
import cx from 'classnames';

function Switch({ rounded = true, isToggled, onToggle }) {
    const sliderCX = cx('slider', {
        'rounded': rounded
    });

    return(
        <>
            <label className="switch">
                <input type="checkbox" checked={ isToggled } onChange={ onToggle }/>
                <span className={ sliderCX }/>
            </label>
        </>
    );
}

export default Switch;
