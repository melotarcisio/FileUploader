from flask import Flask
from flask import request
from flask import Response
from flask import jsonify
from flask import send_from_directory
import logging
import os
import win32com.client
import pythoncom
import socket
import webbrowser
import click

app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
app.logger.disabled = True
log.disabled = True

def secho(text, file=None, nl=None, err=None, color=None, **styles):
    pass

def echo(text, file=None, nl=None, err=None, color=None, **styles):
    pass

click.echo = echo
click.secho = secho

def getFileMetadata(path, filename):
    metadata = ['Name', 'Size', 'Item type']
    pythoncom.CoInitialize()
    sh = win32com.client.gencache.EnsureDispatch('Shell.Application', 0)
    ns = sh.NameSpace(path)
    file_metadata = dict()
    item = ns.ParseName(str(filename))
    for ind, attribute in enumerate(metadata):
        attr_value = ns.GetDetailsOf(item, ind)
        if attr_value:
            file_metadata[attribute] = attr_value
    return file_metadata


def get_ip(p):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    print(f'''{'='*40}\nUtilize o seguinte endereço de IP no seu aplicativo para se conectar a este computador\n{IP}:{p}/\n{'='*40}\n\n''')
    return IP


def getDirectoryList(path):
    path = f'{ipt}download/{path}'
    dir = os.listdir(path)
    dic = {}
    for file in dir:
        dic[file] = getFileMetadata(path.replace('/', '\\'), file)
    return dic
    

@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['upload']
        f.save(f"{ipt}/upload/{request.headers['name']}")
        print(f'Arquivo {request.headers["name"]} recebido com sucesso!\n')
    return Response('good')


@app.route("/download", methods=['GET','POST'])
def download_file():
    path = request.headers['path']
    if path == '':
        return jsonify(getDirectoryList(path))
    else:
        print(f'Enviando arquivo {path}!\n')
        return send_from_directory(app.config['FILES'], path=ipt + 'download', filename=path, as_attachment=True)


@app.route('/url', methods=['GET', 'POST'])
def open_url():
    url = request.headers['url']
    webbrowser.open(url, new=1, autoraise=True)
    print(f'Abrindo link:\t{url}\n')
    return Response('Abrindo')


@app.route('/check', methods=['GET', 'POST'])
def checker():
    print('checking')
    return Response(f'finded;{socket.gethostname()}')

def getDirectorys():
    subdir = ['download', 'upload']
    try:
        dir = os.listdir(ipt)
        for i in subdir:
            if not i in dir:
                os.mkdir(f'{ipt}/{i}')
    except:
        os.mkdir(ipt)
        for i in subdir:
            os.mkdir(f'{ipt}/{i}')


ipt = 'C:/Users/junio/Desktop/files/'
app.config['FILES'] = ipt + 'download'
getDirectorys()
try:
    app.run(host=get_ip(5000), port=5000, debug=False)
except:
    app.run(host=get_ip(5050), port=5050, debug=False)