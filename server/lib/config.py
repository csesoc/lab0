def readConfig() -> dict:
    import configparser
    config = configparser.ConfigParser()
    config.read('settings.ini')
    return config._sections


config: dict = readConfig()
