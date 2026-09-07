import urllib.request
import json

def run_tests():
    endpoints = [
        '/stats',
        '/filters/options',
        '/data?limit=5',
        '/charts/intensity-timeline',
        '/charts/sector-distribution',
        '/charts/region-analysis',
        '/charts/pestle-matrix',
        '/charts/relevance-likelihood',
        '/charts/country-rankings',
        '/charts/top-topics',
        '/charts/swot-distribution'
    ]

    print('=== Testing Backend API Endpoints ===')
    for ep in endpoints:
        url = 'http://127.0.0.1:5000/api' + ep
        try:
            with urllib.request.urlopen(url) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                is_success = data.get('success', False)
                print(f"  [OK] {ep:35} -> HTTP {resp.status} (success={is_success})")
        except Exception as e:
            print(f"  [FAIL] {ep:35} -> Error: {e}")

    print('\n=== Testing Frontend Dev Server ===')
    try:
        with urllib.request.urlopen('http://localhost:5173/') as resp:
            print(f"  [OK] Frontend http://localhost:5173/ -> HTTP {resp.status}")
    except Exception as e:
        print(f"  [FAIL] Frontend -> Error: {e}")

if __name__ == '__main__':
    run_tests()
