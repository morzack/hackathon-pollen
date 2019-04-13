# ok so i just want to dump some data for testing

import requests
import json

def read_key():
    data = json.load(open('secret.json', 'r'))
    return data['api-key']

def generate_request(lat, lng):
    request = "https://api.breezometer.com/baqi/?lat={}&lon={}&key={}".format(lat, lng, read_key())
    return request

def get_data_request(request):
    r = requests.get(request)
    return r.json()

import pickle

pickle.dump(get_data_request(generate_request(35.7930345,-78.7214182)), open('request', 'wb'))