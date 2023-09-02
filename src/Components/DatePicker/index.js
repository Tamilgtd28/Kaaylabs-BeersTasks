import moment, { isMoment, Moment } from 'moment';
import ReactDatetime from "react-datetime";
import { FormGroup } from 'reactstrap';
import "react-datetime/css/react-datetime.css";


function DatePicker({ id, heading, placeholder, type = 'date', dateFormatType = "LT", onChange, disableFuture = false, dateShowingFormat = "after", disabled = false,  ...rest }) {

    return (
        <FormGroup>
            {heading && <label htmlFor={id} className={`form-control-label h6`}>{heading}</label>}

            <ReactDatetime
                {...rest}
                inputProps={
                    {
                        disabled: disabled,
                        placeholder: placeholder,
                        onKeyDown: (e) => { e.preventDefault() },

                    }
                }
                closeOnSelect={true}
                timeFormat={type !== 'date' && true}
                dateFormat={type === 'time' ? false : 'MM/YYYY'}
                onChange={
                    (date) => {
                        if (onChange)
                            if (isMoment(date))
                                onChange(type === 'time' ? date.format('LT') : type === 'both' ? date.format() : date.format('MM-YYYY'))
                            else
                                onChange(date)
                    }
                }
            />
        </FormGroup >
    )
}

export { DatePicker };

