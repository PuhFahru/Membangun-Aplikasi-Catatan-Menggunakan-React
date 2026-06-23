import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      errorMessage: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const nextTitle = event.target.value.slice(0, 50);

    this.setState({
      title: nextTitle,
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState({
      body: event.target.value,
      errorMessage: '',
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    if (body.trim().length < 10) {
      this.setState({
        errorMessage: 'Isi catatan minimal harus 10 karakter',
      });
      return;
    }

    this.props.addNote({ title, body });
    this.setState({
      title: '',
      body: '',
      errorMessage: '',
    });
  }

  render() {
    const { title, body, errorMessage } = this.state;
    const remainingChars = 50 - title.length;
    const counterClassName =
      remainingChars < 10
        ? 'note-input__title__char-limit note-input__title__char-limit--warn'
        : 'note-input__title__char-limit';

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {errorMessage ? (
          <p className="note-input__feedback note-input__feedback--error">
            {errorMessage}
          </p>
        ) : null}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <p
            className={counterClassName}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
