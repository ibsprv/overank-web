import React, { PureComponent } from 'react';
import detectBrowserLanguage from 'detect-browser-language';
import { withLocalize, Translate, LocalizeContextProps } from 'react-localize-redux';
import textTranslations from '../translations/test.json';

class Test extends PureComponent<LocalizeContextProps> {
    constructor(props: LocalizeContextProps) {
        super(props);
        this.addTranslationsForActiveLanguage();
    }

    public componentDidMount() {
        this.setState({ userLanguage: detectBrowserLanguage() });
    }

    public render() {
        return (
            <div>
                <Translate id="testMsg">Do Translate this</Translate>
          </div>
        );
    }

    private addTranslationsForActiveLanguage() {
        const { activeLanguage } = this.props;

        if (!activeLanguage) {
            return;
        }

        this.props.addTranslation(textTranslations);
    }
}

export default withLocalize(Test);
