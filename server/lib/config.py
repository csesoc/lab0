config: dict


def readConfig(file="settings.ini") -> dict:
    _defaultFile = "settings.ini"
    _skeletonFile = "settings.example.ini"
    
    import os.path
    if file == _defaultFile and not os.path.isfile(file):
      if not os.path.isfile(_skeletonFile):
        raise Exception("Missing settings skeleton file!")
      import shutil
      shutil.copy(_skeletonFile, _defaultFile)
      print("Created settings.ini file.\nPlease modify your settings then run the server again")
      import sys
      sys.exit(1)

    import configparser
    _config = configparser.ConfigParser()
    try:
      if len(_config.read(file)) == 0:
        raise Exception()
    except Exception:
      raise Exception(f"Could not load settings from: {file}")
    global config
    config = _config._sections
    return config


readConfig()
