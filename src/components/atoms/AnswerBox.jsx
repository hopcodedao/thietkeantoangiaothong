import { Fragment } from 'react';

import { CheckBox } from '../';

function AnswerBox({ input, handleChange, options = [] }) {
  const handleOptionChange = (e, index) => {
    if (handleChange) {
      handleChange(e, index);
    }
  };
  
  return (
    <div className="mb-2">
      <div className="grid grid-cols-options grid-rows-[repeat(3,auto)] gap-2 lg:grid-flow-col lg:gap-4">
        {options.map((option, index) => (
          <Fragment key={index}>
            {input ? (
              <CheckBox
                key={index}
                checked={option.checked}
                className="answer-option"
                text={option.title}
                value={index}
                type="checkbox" // hoặc radio nếu cần
                onChange={(e) => handleOptionChange(e, index)}
              />
            ) : (
              <CheckBox
                key={index}
                className={`answer-option ${
                  option.correct ? 'answer-correct' : option.checked ? 'answer-wrong' : null
                }`}
                defaultChecked={option.checked}
                text={option.title}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default AnswerBox;
