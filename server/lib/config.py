config: dict


def readConfig(file="settings.ini") -> dict:
    import configparser
    _config = configparser.ConfigParser()
    _config.read(file)
    global config
    config = _config._sections
    return config


readConfig()
