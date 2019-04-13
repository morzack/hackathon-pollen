import pickle

data = pickle.load(open('request', 'rb'))

def get_air_quality_readout(data):
    for pollutant in data['pollutants']:
        p = data['pollutants'][pollutant]
        print("{}: {}{}".format(p['pollutant_description'], p['concentration'], p['units']))

print("pollutants:\n----------------------------")
get_air_quality_readout(data)