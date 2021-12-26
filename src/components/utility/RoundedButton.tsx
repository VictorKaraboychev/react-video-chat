import { IconType } from 'react-icons';
import { StyleSheet } from '../../types/global';
import useCustomState from '../../state/state';

const RoundedButton = (props: { visible?: boolean; Icon: IconType; label?: string; radius?: number; color?: string; onPress: () => void; }) => {
    const { COLORS } = useCustomState.theme()

    const radius = props.radius || 50 // default radius is 50

    const styles: StyleSheet = {
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            width: radius,
            height: radius,
            borderRadius: radius / 4,
            backgroundColor: COLORS.theme.background.tertiary,
        },
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: props.color ? props.color : COLORS.theme.text.secondary,
            fontWeight: 'bold',
            fontSize: 14,
            marginTop: 2,
            textAlign: 'center',
        },
        icon: {
            color: props.color ? props.color : COLORS.theme.text.primary,
            fontSize: radius / 2,
        },
    }

    return (
        <div style={styles.container}>
            <button 
                onClick={props.onPress}
                style={styles.button}
                disabled={!(props.visible === undefined ? true : props.visible)}
            >
                {props.Icon ? <props.Icon style={styles.icon} /> : null}
            </button>
            {props.label ? <p style={styles.text}>{props.label}</p> : null}
        </div>
    );
}

export default RoundedButton;